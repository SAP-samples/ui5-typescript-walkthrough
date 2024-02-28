import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import { MetadataOptions } from "sap/ui/core/Element";
import Label from "sap/m/Label";
import Button, { Button$PressEvent } from "sap/m/Button";
import RatingIndicator, { RatingIndicator$LiveChangeEvent } from "sap/m/RatingIndicator";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace ui5.walkthrough.control
 */
export default class ProductRating extends Control {
	// The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
	constructor(idOrSettings?: string | $ProductRatingSettings);
	constructor(id?: string, settings?: $ProductRatingSettings);
	constructor(id?: string, settings?: $ProductRatingSettings) { super(id, settings); }	

	static readonly metadata: MetadataOptions = {
		properties: {
			value: {
				type: "float",
				defaultValue: 0
			}
		},
		aggregations: {
			_rating: {
				type: "sap.m.RatingIndicator", 
				multiple: false,
				visibility: "hidden"
			},
			_label: {
				type: "sap.m.Label", 
				multiple: false,
				visibility: "hidden"
			},
			_button: {
				type: "sap.m.Button",
				multiple: false,
				visibility: "hidden"
			} 
		},
		events: {
			change: {
				parameters: {
					"value": "float"
				}
			}
		}
	}

	init(): void {
		this.setAggregation("_rating", new RatingIndicator({
			value: this.getValue(),
			iconSize: "2rem",
			liveChange: this._onRate.bind(this)
		}));
		this.setAggregation("_label", new Label({
			text: "{i18n>productRatingLabelInitial}"
		}).addStyleClass("sapUiSmallMargin"));
		this.setAggregation("_button", new Button({
			text: "{i18n>productRatingButton}",
			press: this._onSubmit.bind(this)
		}).addStyleClass("sapUiTinyMarginTopBottom"));
	}

	setValue(value: "float" ): ProductRating {
		this.setProperty("value", value, true);
		(<RatingIndicator> this.getAggregation("_rating")).setValue(value);

		return this;		
	}

	reset(): void {
		const resourceBundle = <ResourceBundle> (<ResourceModel> this?.getModel("i18n"))?.getResourceBundle();

		this.setValue(0);
		(<Label> this.getAggregation("_label")).setDesign("Standard");
		(<RatingIndicator> this.getAggregation("_rating")).setEnabled(true);
		(<Label> this.getAggregation("_label")).setText(resourceBundle.getText("productRatingLabelInitial"));
		(<Button> this.getAggregation("_button")).setEnabled(true);
	}

	_onRate(event: RatingIndicator$LiveChangeEvent): void {
		const ressourceBundle = <ResourceBundle> (<ResourceModel> this?.getModel("i18n"))?.getResourceBundle();
		const value = event.getParameter("value");

		this.setProperty("value", value, true);

		(<Label> this.getAggregation("_label")).setText(ressourceBundle.getText("productRatingLabelIndicator", [value, (<RatingIndicator> event.getSource()).getMaxValue()]));
		(<Label> this.getAggregation("_label")).setDesign("Bold");
	}

	_onSubmit(event: Button$PressEvent): void {
		const resourceBundle = <ResourceBundle> (<ResourceModel> this?.getModel("i18n"))?.getResourceBundle();

		(<RatingIndicator> this.getAggregation("_rating")).setEnabled(false);
		(<Label> this.getAggregation("_label")).setText(resourceBundle.getText("productRatingLabelFinal"));
		(<Button> this.getAggregation("_button")).setEnabled(false);
		this.fireEvent("change", {
			value: this.getValue()
		})
	}

	renderer = {  
		apiVersion: 4,
		render: (rm: RenderManager, control: ProductRating) => {
			const tooltip = control.getTooltip_AsString();
			rm.openStart("div", control);
			rm.class("myAppDemoWTProductRating");
			if (tooltip) {
				rm.attr("title", tooltip);
			}
			rm.openEnd();
			rm.renderControl(<Control> control.getAggregation("_rating"));
			rm.renderControl(<Control> control.getAggregation("_label"));
			rm.renderControl(<Control> control.getAggregation("_button"));
			rm.close("div");
		}
	}
};

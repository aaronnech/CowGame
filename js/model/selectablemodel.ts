interface SelectableModel {
    onSelect() : void;
    onDeselect() : void;
    isSelected() : boolean;
}

export = SelectableModel;
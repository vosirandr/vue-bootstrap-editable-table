# COMPONENTS

## Editable table

The editable table - highly configurable table

    /components/editable-table

@vue-prop {Field[]} fields - List of fields

@vue-prop {Row[]} rows - List of rows

@vue-prop {ColumnType[]} columnTypes - List of column types

@vue-prop {string=} height - Height of the table, should be empty or valid css property (like '500px' or '50vh')

@vue-event {ChangePayload} change - Change cell`s value

@vue-event {ChangeAggregatingPayload} change-aggregating - Change aggregation function for the field (Field)

@vue-event {} add-row - Add a new row (Row) to the end of the rows list

@vue-event {string} del-row - Delete a row by it's name (Row.name)

@vue-event {AddColPayload} add-col - Add a new column (Field) to the end of the fields list

@vue-event {string} del-col - Delete a column (Filed) by it's name

@vue-event {ResizeColPayload} resize-col - Change column's width (Field.width)

@vue-event {MoveColPayload} move-col - Change column's position in the field list 

@vue-event {RenameColPayload} rename-col - Change column's name (Filed.caption)

## Table switcher

Wrapper for an editable table. Contains a button that allows to switch between table and json-view mode.

    /components/table-switcher

## Defs

### Field

Field of the table. Contains definition of the table column

@typedef {Object} Field

@property {string} name - Id of the field

@property {string} caption - Name of the field

@property {string} type - Type of the field

@property {number=} width - Width of the field (in pixels)

@property {string=} aggregate - Name of aggregate function

@property {boolean=} unique - If set, values of this field should be unique for all rows

### Row

Row of the table. Contains data of the table row

@typedef {Object} Row

@property {...*} Field.name - Value of the field

### ColumnType

ColumnType - Class that defines type of the column (Field.type property). See:

    /components/editable-table/column-types

### ChangePayload

Payload of the "change" event

@typedef {Object} ChangePayload

@property {string} fieldName - Name of the field (Field.name)

@property {string} rawName - Name of the row (Row.name)

@property {*} value - Cell`s value to update

### ChangeAggregatingPayload

Payload of the "change-aggregating" event

@typedef {Object} ChangeAggregatingPayload

@property {string} fieldName - Name of the field (Field.name)

@property {string} aggregation - Name of the aggregation function (Field.aggregation)

### AddColPayload

Payload of the "add-col" event

@typedef {Object} AddColPayload

@property {string} name - Name of the field (Field.name)

@property {string} type - Type of the field (Field.type)

### ResizeColPayload

Payload of the "resize-col" event

@typedef {Object} AddColPayload

@property {string} name - Name of the field (Field.name)

@property {number} width - New width of the field (Field.width)

### MoveColPayload

Payload of the "move-col" event

@typedef {Object} MoveColPayload

@property {string} name - Name of the field (Field.name)

@property {number} index - New index of the field in the fields list

### RenameColPayload

Payload of the "rename-col" event

@typedef {Object} RenameColPayload

@property {string} name - Name of the field (Field.name)

@property {string} caption - New caption of the field (Filed.caption)

# COLUMN TYPES

Every column type consists of two main parts: a class that defines aggregation and validation methods and a component representing a cell's value. 

To add new ColumnType you should create new class and extend it from ColumnType class. Then you should set new value in static "type" property in children class. That value can be used if table fields (Filed.type property). After that, you should create vue component and extend it from t-typed-cell. Finally, you define static cell property in class you made in step 1.


class Document:
    _id = None


class Person(Document):
    name = None
    birthdate = None


class ProfileData(Document):
    type_id = None
    person_id = None
    fields_values = {}  # field id to value


class ProfileType(Document):
    fields = []  # of Field


class Field(Document):  # abstract
    name = None
    type = None


class TextField(Field):
    type = 'Text'


class DateField(Field):
    type = 'Date'


class OptionsField(Field):
    type = 'Options'
    possible_values = []

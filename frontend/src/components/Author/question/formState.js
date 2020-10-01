const user = JSON.parse(localStorage.getItem("user"));
const author =
   user && user !== "undefined"
      ? user.userObj.first_name + " " + user.userObj.last_name
      : "";
const grade_level =
   localStorage.getItem("grade_level") &&
   localStorage.getItem("grade_level") !== "undefined"
      ? JSON.parse(localStorage.getItem("grade_level"))
      : "";
const standard_code =
   localStorage.getItem("standard_code") &&
   localStorage.getItem("standard_code") !== "undefined"
      ? JSON.parse(localStorage.getItem("standard_code"))
      : "";
const standard_set =
   localStorage.getItem("standard_set") &&
   localStorage.getItem("standard_set") !== "undefined"
      ? JSON.parse(localStorage.getItem("standard_set"))
      : "";

export default {
   value: "",
   author_name: author,
   question_type: "",
   grade_level: grade_level,
   content_source: "",
   image_source: "",
   alt_text: "",
   mills_difficulty_level: "",
   dok: "",
   copyright_status: "",
   summative_status: false,
   state_model: false,
   author_memo: "",
   creator: "",
   standard_code: standard_code,
   standard_set: standard_set,
};

// value = TextField  (The Questions text itself.)
// author_name = CharField
// reviewer_name = CharField
// grade_level = CharField
// question_type = CharField(choices=QTYPE.choices)
// content_source = TextField(null=True, blank=True)
// image = ImageField(null=True, blank=True)
// image_source = CharField(null=True, blank=True)
// alt_text = CharField(null=True, blank=True)
// mills_difficulty_level = IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
// dok = IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
// copyright_status = TextField(null=True, blank=True)
// question_style = CharField(choices=QSTYLE.choices)
// summative_status = BooleanField(default=False)
// approved_status = PositiveSmallIntegerField(choices=ASTATUS.choices)
// state_model = BooleanField(default=False)
// author_memo = TextField(null=True, blank=True)
// creator = ForeignKey('Creator', on_delete=models.SET_DEFAULT, default='NA')
// standard_code = CharField
// standard_set = JSONField(blank=True, null=True)
// created = DateTimeField(auto_now_add=True)
// reviewer_date = DateTimeField(auto_now=True)
// modified = DateTimeField(auto_now=True)

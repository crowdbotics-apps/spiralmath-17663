from django import forms
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model, password_validation

from . import models

User = get_user_model()


class UserCreation(forms.ModelForm):
    error_messages = {
        'password_mismatch': _("The two password fields didn't match."),
        'duplicate_username': _("This username has already been taken.")
    }

    password1 = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput,
        help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = forms.CharField(
        label=_("Password confirmation"),
        widget=forms.PasswordInput,
        strip=False,
        help_text=_("Enter the same password as before, for verification."),
    )

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return password2

    def _post_clean(self):
        super()._post_clean()
        # Validate the password after self.instance is updated with form data
        # by super().
        password = self.cleaned_data.get('password2')
        if password:
            try:
                password_validation.validate_password(password, self.instance)
            except forms.ValidationError as error:
                self.add_error('password2', error)

    def create_user(self, instance):
        raise NotImplemented

    def save(self, commit=True):
        instance = super().save(commit=False)
        user = self.create_user(instance)
        instance.user = user
        if commit:
            instance.save()
        return instance


class AddLeadTeacherForm(UserCreation):

    class Meta:
        model = models.LeadTeacher
        fields = ['first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                  'work_phone', 'personal_phone', 'memo', 'is_active', 'password1', 'password2']

    def clean_work_email(self):  # NOQA
        username = self.cleaned_data.get('work_email')
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username

        raise forms.ValidationError(self.error_messages["duplicate_username"])

    def create_user(self, instance):
        user = User.objects.create(
            first_name=self.cleaned_data.get('first_name'),
            last_name=self.cleaned_data.get('last_name'),
            email=instance.work_email,
            username=instance.work_email,
            status=User.STATUS.ACTIVE,
            role=User.ROLE.LEAD_TEACHER,
        )
        user.set_password(self.cleaned_data.get('password1'))
        user.save()
        return user


class AddAssistTeacherForm(UserCreation):

    class Meta:
        model = models.AssistTeacher
        fields = ['first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                  'work_phone', 'personal_phone', 'memo', 'is_active', 'password1', 'password2']

    def clean_work_email(self):  # NOQA
        username = self.cleaned_data.get('work_email')
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username

        raise forms.ValidationError(self.error_messages["duplicate_username"])

    def create_user(self, instance):
        user = User.objects.create(
            first_name=self.cleaned_data.get('first_name'),
            last_name=self.cleaned_data.get('last_name'),
            email=instance.work_email,
            username=instance.work_email,
            status=User.STATUS.ACTIVE,
            role=User.ROLE.ASSIST_TEACHER,
        )
        user.set_password(self.cleaned_data.get('password1'))
        user.save()
        return user


class AddStudentForm(UserCreation):

    class Meta:
        model = models.Student
        fields = ['first_name', 'middle_name', 'last_name', 'nickname', 'email', 'phone',
                  'parent1_name', 'parent1_email', 'parent1_phone', 'parent2_name', 'parent2_email',
                  'parent2_phone', 'memo', 'is_active']

    def clean_email(self):  # NOQA
        username = self.cleaned_data.get('email')

        if not username:
            username = '.'.join(filter(None, [self.cleaned_data.get('first_name').lower(),
                                              self.cleaned_data.get('middle_name', None),
                                              self.cleaned_data.get('last_name').lower()]))
            index = 1
            while User.objects.filter(username=f'{username}@no-email.com').exists():
                username += str(index)

            username = f'{username}@no-email.com'

        return username

    def create_user(self, instance):
        user = User.objects.create(
            first_name=self.cleaned_data.get('first_name'),
            last_name=self.cleaned_data.get('last_name'),
            email=instance.email,
            username=instance.email,
            status=User.STATUS.ACTIVE,
            role=User.ROLE.STUDENT,
        )
        user.set_password(self.cleaned_data.get('password1'))
        user.save()
        return user


class AddSchoolBossForm(UserCreation):

    class Meta:
        model = models.SchoolPrincipal
        fields = ['first_name', 'middle_name', 'last_name', 'work_email', 'personal_email', 'work_phone',
                  'personal_phone', 'school']

    def clean_work_email(self):  # NOQA
        username = self.cleaned_data.get('work_email')
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username

        raise forms.ValidationError(self.error_messages["duplicate_username"])

    def create_user(self, instance):
        user = User.objects.create(
            first_name=self.cleaned_data.get('first_name'),
            last_name=self.cleaned_data.get('last_name'),
            email=instance.work_email,
            username=instance.work_email,
            status=User.STATUS.ACTIVE,
            role=User.ROLE.SCHOOL_BOSS,
        )
        user.set_password(self.cleaned_data.get('password1'))
        user.save()
        return user


class AddDistrictBossForm(UserCreation):

    class Meta:
        model = models.DistrictPrincipal
        fields = ['first_name', 'middle_name', 'last_name', 'work_email', 'work_phone', 'personal_email',
                  'personal_phone', 'district', 'memo', 'is_active']

    def clean_work_email(self):  # NOQA
        username = self.cleaned_data.get('work_email')
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username

        raise forms.ValidationError(self.error_messages["duplicate_username"])

    def create_user(self, instance):
        user = User.objects.create(
            first_name=self.cleaned_data.get('first_name'),
            last_name=self.cleaned_data.get('last_name'),
            email=instance.work_email,
            username=instance.work_email,
            status=User.STATUS.ACTIVE,
            role=User.ROLE.DISTRICT_BOSS,
        )
        user.set_password(self.cleaned_data.get('password1'))
        user.save()
        return user

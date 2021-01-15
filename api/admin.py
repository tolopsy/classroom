from django.contrib import admin

from .models import Assignment, GradedAssignment, Question, Choice

admin.site.register(Assignment)
admin.site.register(GradedAssignment)
admin.site.register(Question)
admin.site.register(Choice)

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("api/", include("lct.api.urls")),
    path("api/users/", include("lct.users.urls")),
    path("api/", include("lct.tasks.urls")),
    path("api/", include("lct.groups.urls")),
    path("api/", include("lct.assign_tasks.urls")),
    path("api/", include("lct.students.urls")),
    path("api/student/", include("lct.student_cabinet.urls")),
    path("admin/", admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

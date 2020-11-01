from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register("students", views.StudentViewSet)

urlpatterns = router.urls

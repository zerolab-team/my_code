from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register("groups", views.GroupViewSet)

urlpatterns = router.urls

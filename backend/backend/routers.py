from rest_framework import routers
from vioms.views import UserViewSet

router=routers.DefaultRouter()
router.register('register', UserViewSet, basename='register')


urlpatterns = router.urls
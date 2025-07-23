from rest_framework import routers
from vioms.views import UserViewSet, ProductViewSet, CustomerViewSet, OrderViewSet


router = routers.DefaultRouter()
router.register('register', UserViewSet, basename='register')
router.register('products', ProductViewSet, basename='products')
router.register('customers', CustomerViewSet, basename='customers')
router.register('orders', OrderViewSet, basename='orders')


urlpatterns = router.urls
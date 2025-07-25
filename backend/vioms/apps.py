from django.apps import AppConfig


class ViomsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'vioms'
    def ready(self):
        import vioms.signals

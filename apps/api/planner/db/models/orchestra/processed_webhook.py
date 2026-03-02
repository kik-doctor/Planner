from django.db import models


class ProcessedWebhook(models.Model):
    key = models.CharField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "processed_webhook"

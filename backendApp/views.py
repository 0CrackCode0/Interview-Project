from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView

from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer, RegisterSerializer


# ---------------- HOME PAGE ----------------
def index(request):
    return render(request, "index.html")

# ---------------- PROJECTS ----------------
class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Project.objects.filter(user=self.request.user)

        search = self.request.query_params.get('search')
        status = self.request.query_params.get('status')

        if search:
            queryset = queryset.filter(title__icontains=search)

        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ---------------- TASKS ----------------
class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(project__user=self.request.user)

    def perform_create(self, serializer):
        project_id = self.kwargs["project_pk"]
        project = Project.objects.get(id=project_id)
        serializer.save(project=project)


# ---------------- REGISTER ----------------
class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
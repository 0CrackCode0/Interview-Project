import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

export default function Tasks() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); // ✅ ADD THIS

    const projectId = id;

    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTasks = async () => {
        try {
            setError("");

            const res = await api.get(`projects/${projectId}/tasks/`);
            setTasks(res.data.results || res.data);

        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    const handleCreateTask = async () => {
        if (!title.trim()) return;

        try {
            await api.post(`projects/${projectId}/tasks/`, {
                title: title.trim(),
            });

            setTitle("");
            fetchTasks();

        } catch {
            setError("Failed to create task");
        }
    };

    const toggleTask = async (task: Task) => {
        try {
            await api.patch(`projects/${projectId}/tasks/${task.id}/`, {
                completed: !task.completed,
            });

            fetchTasks();

        } catch {
            setError("Failed to update task");
        }
    };

    const deleteTask = async (taskId: number) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(
                `projects/${projectId}/tasks/${taskId}/`
            );

            fetchTasks();
        } catch {
            setError("Failed to delete task");
        }
    };

    return (
        <div className="container mt-5">

            {/* ✅ HEADER WITH BACK BUTTON */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Project Tasks</h2>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Back to Dashboard
                </button>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="input-group mb-3">
                <input
                    className="form-control"
                    placeholder="New task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleCreateTask}
                >
                    Add
                </button>
            </div>

            {loading && <p>Loading tasks...</p>}

            <div className="list-group">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="list-group-item d-flex justify-content-between"
                    >
                        <div>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task)}
                                className="me-2"
                            />

                            <span
                                style={{
                                    textDecoration: task.completed
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {task.title}
                            </span>
                        </div>

                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
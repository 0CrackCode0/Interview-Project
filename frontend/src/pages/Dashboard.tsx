import { useEffect, useState } from "react";
import api from "../api/axios";

type Project = {
    id: number;
    title: string;
    description: string;
    status: "active" | "completed";
};

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // pagination
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);

    // form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"active" | "completed">("active");

    const [editingProject, setEditingProject] = useState<Project | null>(null);

    // ---------------- FETCH ----------------
    const fetchProjects = async (url = "projects/") => {
        try {
            setError("");

            const res = await api.get(url);

            const data = res.data;

            setProjects(data.results || data);

            setNextPage(data.next || null);
            setPrevPage(data.previous || null);

        } catch {
            setError("Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // ---------------- RESET ----------------
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStatus("active");
        setEditingProject(null);
    };

    // ---------------- CREATE ----------------
    const handleCreateProject = async () => {
        if (!title.trim() || !description.trim()) return;

        try {
            await api.post("projects/", {
                title: title.trim(),
                description: description.trim(),
                status,
            });

            resetForm();
            fetchProjects();

            document.getElementById("closeModal")?.click();
        } catch {
            setError("Failed to create project");
        }
    };

    // ---------------- EDIT ----------------
    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setTitle(project.title);
        setDescription(project.description);
        setStatus(project.status);
    };

    // ---------------- UPDATE ----------------
    const handleUpdateProject = async () => {
        if (!editingProject) return;

        try {
            await api.put(`projects/${editingProject.id}/`, {
                title,
                description,
                status,
            });

            resetForm();
            fetchProjects();

            document.getElementById("closeModal")?.click();
        } catch {
            setError("Failed to update project");
        }
    };

    // ---------------- DELETE ----------------
    const handleDeleteProject = async (id: number) => {
        const ok = window.confirm("Delete this project?");
        if (!ok) return;

        try {
            await api.delete(`projects/${id}/`);
            fetchProjects();
        } catch {
            setError("Failed to delete project");
        }
    };

    // ---------------- LOGOUT ----------------
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <div className="container mt-5">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">My Projects</h2>
                    <p className="text-muted">Manage your work efficiently</p>
                </div>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#projectModal"
                        onClick={resetForm}
                    >
                        + New Project
                    </button>

                    <button
                        className="btn btn-outline-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* ERROR */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* LOADING */}
            {loading && <div className="alert alert-info">Loading...</div>}

            {/* CARDS */}
            <div className="row">
                {projects.map((p) => (
                    <div key={p.id} className="col-md-4 mb-3">
                        <div className="card shadow-sm p-3 h-100">

                            <div className="d-flex justify-content-between">
                                <h5>{p.title}</h5>

                                <span className={`badge ${p.status === "active" ? "bg-success" : "bg-secondary"}`}>
                                    {p.status}
                                </span>
                            </div>

                            <p className="text-muted mt-2">{p.description}</p>

                            <div className="d-flex gap-2 mt-auto">

                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#projectModal"
                                    onClick={() => handleEdit(p)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDeleteProject(p.id)}
                                >
                                    Delete
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-dark"
                                    onClick={() => window.location.href = `/projects/${p.id}/tasks`}
                                >
                                    Tasks
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-between mt-3">
                <button
                    className="btn btn-outline-secondary"
                    disabled={!prevPage}
                    onClick={() => fetchProjects(prevPage!)}
                >
                    Previous
                </button>

                <button
                    className="btn btn-outline-secondary"
                    disabled={!nextPage}
                    onClick={() => fetchProjects(nextPage!)}
                >
                    Next
                </button>
            </div>

            {/* MODAL */}
            <div className="modal fade" id="projectModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                {editingProject ? "Edit Project" : "Create Project"}
                            </h5>

                            <button className="btn-close" data-bs-dismiss="modal" />
                        </div>

                        <div className="modal-body">
                            <input
                                className="form-control mb-2"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                className="form-control mb-2"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                            >
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="modal-footer">
                            <button
                                id="closeModal"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={resetForm}
                            >
                                Close
                            </button>

                            {editingProject ? (
                                <button className="btn btn-primary" onClick={handleUpdateProject}>
                                    Update
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={handleCreateProject}>
                                    Create
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
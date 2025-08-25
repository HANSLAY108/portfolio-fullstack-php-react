<?php
// models/Project.php
class Project {
    private $conn;
    private $table = 'projects';

    public $id;
    public $title;
    public $slug;
    public $description;
    public $key_features;
    public $image_url;
    public $tags;
    public $live_url;
    public $github_url;
    public $is_featured;

    public function __construct($db) { $this->conn = $db; }

    public function read() {
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY created_at DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOneById($id) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id = :id LIMIT 1';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function readOneBySlug($slug) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE slug = :slug LIMIT 1';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        $project = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$project) return null;

        $query_screenshots = 'SELECT id, image_url, caption FROM project_screenshots WHERE project_id = :project_id';
        $stmt_screenshots = $this->conn->prepare($query_screenshots);
        $stmt_screenshots->bindParam(':project_id', $project['id']);
        $stmt_screenshots->execute();
        
        $project['screenshots'] = $stmt_screenshots->fetchAll(PDO::FETCH_ASSOC);
        return $project;
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' SET title = :title, slug = :slug, description = :description, image_url = :image_url, tags = :tags, live_url = :live_url, github_url = :github_url, key_features = :key_features, is_featured = :is_featured';
        $stmt = $this->conn->prepare($query);
        
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->slug = htmlspecialchars(strip_tags($this->slug));
        
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':image_url', $this->image_url);
        $stmt->bindParam(':tags', $this->tags);
        $stmt->bindParam(':live_url', $this->live_url);
        $stmt->bindParam(':github_url', $this->github_url);
        $stmt->bindParam(':key_features', $this->key_features);
        $stmt->bindParam(':is_featured', $this->is_featured, PDO::PARAM_INT);

        if ($stmt->execute()) { return true; }
        error_log("PDO Error in Project::create(): " . implode(" - ", $stmt->errorInfo()));
        return false;
    }
    
    public function update() {
        $query = 'UPDATE ' . $this->table . ' SET title = :title, slug = :slug, description = :description, tags = :tags, live_url = :live_url, github_url = :github_url, key_features = :key_features, is_featured = :is_featured';
        if ($this->image_url) { $query .= ', image_url = :image_url'; }
        $query .= ' WHERE id = :id';
        
        $stmt = $this->conn->prepare($query);
        
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->slug = htmlspecialchars(strip_tags($this->slug));
        
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':tags', $this->tags);
        $stmt->bindParam(':live_url', $this->live_url);
        $stmt->bindParam(':github_url', $this->github_url);
        $stmt->bindParam(':key_features', $this->key_features);
        $stmt->bindParam(':is_featured', $this->is_featured, PDO::PARAM_INT);
        $stmt->bindParam(':id', $this->id);
        
        if ($this->image_url) { $stmt->bindParam(':image_url', $this->image_url); }
        
        if ($stmt->execute()) { return true; }
        error_log("PDO Error in Project::update(): " . implode(" - ", $stmt->errorInfo()));
        return false;
    }

    public function delete() {
        $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
?>
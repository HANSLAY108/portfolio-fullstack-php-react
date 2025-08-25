<?php
// models/Profile.php
class Profile {
    private $conn;
    private $table = 'profile';
    public $id = 1;

    public $tagline;
    public $biography;
    public $skills;
    public $resume_url;
    public $social_links;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateTextData() {
        $query = 'UPDATE ' . $this->table . '
                  SET tagline = :tagline, 
                      biography = :biography, 
                      skills = :skills, 
                      social_links = :social_links
                  WHERE id = :id';
        
        $stmt = $this->conn->prepare($query);

        $this->tagline = htmlspecialchars(strip_tags($this->tagline));
        $this->biography = htmlspecialchars(strip_tags($this->biography));

        $stmt->bindParam(':tagline', $this->tagline);
        $stmt->bindParam(':biography', $this->biography);
        $stmt->bindParam(':skills', $this->skills);
        $stmt->bindParam(':social_links', $this->social_links);
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }

    public function updateResumeUrl() {
        $query = 'UPDATE ' . $this->table . ' SET resume_url = :resume_url WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':resume_url', $this->resume_url);
        $stmt->bindParam(':id', $this->id);
        return $stmt->execute();
    }
}
?>
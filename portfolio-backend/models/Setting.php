<?php
// models/Setting.php
class Setting {
    private $conn;
    private $table = 'settings';
    public $id = 1;

    public $site_title, $logo_url, $accent_color, $contact_email, $contact_phone;

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

    public function updateField($field, $value) {
        $allowed_fields = ['logo_url', 'accent_color', 'contact_email', 'contact_phone', 'site_title'];
        if (!in_array($field, $allowed_fields)) {
            return false;
        }

        $query = 'UPDATE ' . $this->table . ' SET ' . $field . ' = :value WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':value', $value);
        $stmt->bindParam(':id', $this->id);
        return $stmt->execute();
    }
}
?>
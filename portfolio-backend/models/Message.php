<?php
// models/Message.php
class Message {
    private $conn;
    private $table = 'messages';

    // Properties
    public $id;
    public $name;
    public $email;
    public $subject;
    public $message;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    // GET ALL Messages
    public function read() {
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY created_at DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // CREATE a new message
    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' SET name = :name, email = :email, subject = :subject, message = :message';
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->subject = htmlspecialchars(strip_tags($this->subject));
        $this->message = htmlspecialchars(strip_tags($this->message));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':subject', $this->subject);
        $stmt->bindParam(':message', $this->message);

        return $stmt->execute();
    }

    // UPDATE a message's status
    public function updateStatus() {
        $query = 'UPDATE ' . $this->table . ' SET status = :status WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }

    // DELETE a message
    public function delete() {
        $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);
        
        return $stmt->execute();
    }

    // GET Message Count
    public function getCount() {
        $query = 'SELECT COUNT(*) as message_count FROM ' . $this->table;
        $stmt = $this->conn->prepare($query);
        try {
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row['message_count'] ?? 0;
        } catch (PDOException $e) {
            return 0; // Return 0 if table doesn't exist or another error occurs
        }
    }
}
?>
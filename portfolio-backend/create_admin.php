<?php
  // File: /portfolio-backend/create_admin.php (TEMPORARY SCRIPT)

  // --- Force PHP to display errors. This is crucial for debugging. ---
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  // -------------------------------------------------------------------

  echo "<h1>Admin User Creation Script</h1>";

  // Include the database connection class
  include_once './config/Database.php';

  try {
    echo "<p>Attempting to connect to the database...</p>";
    $database = new Database();
    $db = $database->connect();
    
    // Check if the connection was successful
    if (!$db) {
        throw new Exception("Database connection returned null. Check your credentials in config/Database.php");
    }
    echo "<p style='color:green;'>Database connection successful!</p>";

    // --- SET YOUR ADMIN DETAILS HERE ---
    $admin_name = 'Toh Hanslay';
    $admin_email = 'tohhanslay@gmail.com'; // Use your actual email
    $admin_password = '12345@'; // IMPORTANT: Choose a strong, new password
    // ------------------------------------

    echo "<p>Admin Details:<br>Name: $admin_name<br>Email: $admin_email</p>";

    // Hash the password using PHP's modern, secure standard
    echo "<p>Hashing password...</p>";
    $hashed_password = password_hash($admin_password, PASSWORD_DEFAULT);
    echo "<p style='color:green;'>Password hashed successfully.</p>";

    // Create the SQL query with named placeholders to prevent SQL injection
    $query = 'INSERT INTO users (name, email, password) VALUES (:name, :email, :password)';
    echo "<p>Preparing SQL query...</p>";

    // Prepare the statement
    $stmt = $db->prepare($query);

    // Bind the parameters
    $stmt->bindParam(':name', $admin_name);
    $stmt->bindParam(':email', $admin_email);
    $stmt->bindParam(':password', $hashed_password);

    // Execute the query
    echo "<p>Executing query...</p>";
    if ($stmt->execute()) {
      echo "<h2 style='color:green;'>Admin user created successfully!</h2>";
      echo "<p>You can now log in with the email and password you set in this script.</p>";
      echo "<p style='font-weight:bold; color:red;'>IMPORTANT: You must now delete this `create_admin.php` file from your server for security reasons.</p>";
    } else {
      $errorInfo = $stmt->errorInfo();
      echo "<h2 style='color:red;'>Error: Could not execute the query.</h2>";
      echo "<p>Database Error: " . $errorInfo[2] . "</p>";
    }

  } catch (PDOException $e) {
    echo "<h2 style='color:red;'>DATABASE ERROR:</h2>";
    echo "<p>" . $e->getMessage() . "</p>";
    echo "<p>Please ensure your database server is running and the credentials in `config/Database.php` are correct.</p>";
  } catch (Exception $e) {
    echo "<h2 style='color:red;'>A GENERAL ERROR OCCURRED:</h2>";
    echo "<p>" . $e->getMessage() . "</p>";
  }
?>
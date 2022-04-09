<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$con = mysqli_connect('localhost', 'root', '', 'oams');
$idno = $_POST['idno'];
$name = $_POST['name'];
$email = $_POST['email'];
$year = $_POST['year'];
$branch = $_POST['branch'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $out = mysqli_query(
        $con,
        "SELECT count(1) c FROM user where idno='" .$idno. "'"
    );

    while ($row = $out->fetch_assoc()) {
        $data = $row['c'];
    }
    if ($data >= 1) {
        echo 'Record Already Exists';
    } else {
        $sql = "INSERT INTO `user` (`idno`, `name`, `email`, `year`, `branch`,`password`) VALUES ('$idno', '$name', '$email', '$year', '$branch', '$password');";
        $rs = mysqli_query($con, $sql);
        if ($rs) {
            echo 'Contact Records Inserted';
        }
        else{
            echo 'Error';
        }
    }
}
?>

<?php
    $upload_dir = 'uploads';

    $pic = $_FILES['file'];

    $dir = getcwd();

    if(move_uploaded_file( $pic['tmp_name'], $dir . '/' . $upload_dir . '/' . $pic['name'] ) ) {

            echo"File uploaded successfuly";  
    }

?>
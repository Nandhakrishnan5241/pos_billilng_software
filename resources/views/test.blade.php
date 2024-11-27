<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jQuery Validation</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.19.5/jquery.validate.min.js"></script>
</head>
<body>
    <form id="exampleForm">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>
        <button type="submit">Submit</button>
    </form>

    <script>
        $(document).ready(function () {
            $("#exampleForm").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 3
                    }
                },
                messages: {
                    name: {
                        required: "Name is required.",
                        minlength: "Name must be at least 3 characters long."
                    }
                }
            });
        });
    </script>
</body>
</html>

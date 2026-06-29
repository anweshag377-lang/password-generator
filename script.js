
document.addEventListener("DOMContentLoaded", function () {

    const password = document.getElementById("password");
    const length = document.getElementById("length");
    const lengthValue = document.getElementById("lengthValue");

    const uppercase = document.getElementById("uppercase");
    const lowercase = document.getElementById("lowercase");
    const numbers = document.getElementById("numbers");
    const symbols = document.getElementById("symbols");

    const generateBtn = document.getElementById("generateBtn");
    const copyBtn = document.getElementById("copyBtn");
    const strength = document.getElementById("strength");

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*(){}[]<>?/";

    // slider update
    length.oninput = function () {
        lengthValue.textContent = this.value;
    };

    function generatePassword() {

        let chars = "";

        if (uppercase.checked) chars += upperChars;
        if (lowercase.checked) chars += lowerChars;
        if (numbers.checked) chars += numberChars;
        if (symbols.checked) chars += symbolChars;

        if (chars === "") {
            alert("Select at least one option");
            return;
        }

        let result = "";

        for (let i = 0; i < length.value; i++) {
            const random = Math.floor(Math.random() * chars.length);
            result += chars[random];
        }

        password.value = result;

        checkStrength(result);
    }

    function checkStrength(pass) {

        let score = 0;

        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[!@#$%^&*(){}[\]<>?/]/.test(pass)) score++;

        if (score <= 1) {
            strength.textContent = "🔴 Weak";
        } else if (score <= 3) {
            strength.textContent = "🟡 Medium";
        } else {
            strength.textContent = "🟢 Strong";
        }
    }

    copyBtn.onclick = function () {

        if (!password.value) return;

        // SAFE COPY (no reload issues)
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = password.value;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        copyBtn.textContent = "✅";

        setTimeout(() => {
            copyBtn.textContent = "📋";
        }, 1500);
    };

    generateBtn.onclick = generatePassword;


});
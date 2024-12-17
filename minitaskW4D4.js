// Ambil elemen-elemen form dan hasil output
const postForm = document.getElementById("postForm");
const postResult = document.getElementById("postResult");

// Tambahkan event listener untuk menangani submit form
postForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // Hentikan default reload halaman

  // Ambil nilai input dari form
  const id = document.getElementById("id").value;
  const userId = document.getElementById("userId").value;
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  // Buat objek data yang akan di-POST
  const newPost = {
    id: parseInt(id),        // Konversi ke integer
    userId: parseInt(userId),
    title: title,
    body: body
  };

  try {
    // Lakukan fetch POST request
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Memberi tahu server bahwa data dalam format JSON
      },
      body: JSON.stringify(newPost), // Ubah objek menjadi string JSON
    });

    // Cek jika response gagal
    if (!response.ok) {
      throw new Error("Gagal mengirim data ke server.");
    }

    // Ambil hasil response dalam bentuk JSON
    const result = await response.json();

    // Tampilkan hasil POST di console dan di halaman
    console.log("Hasil POST:", result);

    postResult.innerHTML = `
      <p><strong>ID:</strong> ${result.id}</p>
      <p><strong>User ID:</strong> ${result.userId}</p>
      <p><strong>Title:</strong> ${result.title}</p>
      <p><strong>Body:</strong> ${result.body}</p>
    `;
  } catch (error) {
    console.error("Error:", error.message);
    postResult.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});

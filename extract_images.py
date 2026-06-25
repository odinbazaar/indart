
import zipfile
import os

def extract_images_from_docx(path, output_dir):
    document = zipfile.ZipFile(path)
    image_list = [f for f in document.namelist() if f.startswith('word/media/')]
    for img in image_list:
        filename = os.path.basename(img)
        # Add prefix of docx name to avoid overwrite
        base_name = os.path.splitext(os.path.basename(path))[0]
        output_filename = f"{base_name}_{filename}"
        with open(os.path.join(output_dir, output_filename), 'wb') as f:
            f.write(document.read(img))
    document.close()

if __name__ == "__main__":
    output_dir = "d:\\avy\\indart"
    files = ["indart metinler.docx", "indart metinler (1).docx"]
    for file in files:
        path = os.path.join("d:\\avy\\indart", file)
        if os.path.exists(path):
            print(f"Extracting images from {file}...")
            extract_images_from_docx(path, output_dir)
    print("Done.")

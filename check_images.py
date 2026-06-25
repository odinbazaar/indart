
import zipfile
import os

def list_images_in_docx(path):
    document = zipfile.ZipFile(path)
    image_list = [f for f in document.namelist() if f.startswith('word/media/')]
    document.close()
    return image_list

if __name__ == "__main__":
    files = ["indart metinler.docx", "indart metinler (1).docx"]
    for file in files:
        path = os.path.join("d:\\avy\\indart", file)
        if os.path.exists(path):
            print(f"--- IMAGES IN {file} ---")
            try:
                images = list_images_in_docx(path)
                for img in images:
                    print(img)
            except Exception as e:
                print(f"Error reading {file}: {e}")
            print("-" * 30)

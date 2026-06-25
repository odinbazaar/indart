
import zipfile
import xml.etree.ElementTree as ET

def get_docx_text(path):
    """
    Take the path of a docx file as argument, return the text in unicode.
    """
    document = zipfile.ZipFile(path)
    xml_content = document.read('word/document.xml')
    document.close()
    tree = ET.fromstring(xml_content)

    # Define the namespaces used in the XML
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

    paragraphs = []
    for paragraph in tree.findall('.//w:p', ns):
        texts = [node.text for node in paragraph.findall('.//w:t', ns) if node.text]
        if texts:
            paragraphs.append("".join(texts))

    return "\n".join(paragraphs)

if __name__ == "__main__":
    import sys
    import os
    
    # Path to the docx files
    files = ["indart metinler.docx", "indart metinler (1).docx"]
    for file in files:
        path = os.path.join("d:\\avy\\indart", file)
        if os.path.exists(path):
            print(f"--- CONTENT OF {file} ---")
            try:
                print(get_docx_text(path))
            except Exception as e:
                print(f"Error reading {file}: {e}")
            print("-" * 30)

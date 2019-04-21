import psycopg2
import os
from pathlib import Path
import xml.etree.cElementTree as ET


class InsertXMLData:

    max_amount_posts = 10000

    def __init__(self):
        self.conn = psycopg2.connect("host=localhost dbname=examensarbete user=admin password=admin")

        script_path = Path(__file__).parent
        self.insert_post_data(os.path.join(script_path, 'extractedPosts.xml'))
        self.insert_comment_data(os.path.join(script_path, './extractedComments.xml'))

        self.conn.close()

    def insert_comment_data(self, file):
        cur = self.conn.cursor()
        parser = ET.iterparse(file)
        amount = 0
        for event, element in parser:
            if event == 'end' and element.tag == 'row':
                amount += 1
                print("Comment: ", amount)
                args = (
                    element.attrib['Id'],
                    element.attrib['Text'],
                    element.attrib['CreationDate'],
                    element.attrib['PostId'],
                )
                cur.execute('INSERT INTO questions_comment (id, post_id, text, creation_date)'
                            + ' SELECT %s, id, %s, %s from questions_post where id = %s', args)
                element.clear()
        cur.close()
        self.conn.commit()

    def insert_post_data(self, file):
        cur = self.conn.cursor()
        parser = ET.iterparse(file)
        amount = 0
        for event, element in parser:
            if event == 'end' and element.tag == 'row':
                if 'ParentId' in element.attrib and \
                        int(element.attrib['ParentId']) > int(element.attrib['Id']):
                    element.clear()
                    continue
                if amount >= InsertXMLData.max_amount_posts:
                    break
                amount += 1
                print("Post: ", amount)
                args = self.extractPostRow(element)
                cur.execute('INSERT INTO questions_post ('
                            + 'id, post_type, parent_id, accepted_answer,'
                            + 'score, title, body,'
                            + 'creation_date, last_edit_date) VALUES ('
                            + '%s, %s, %s, %s,'
                            + '%s, %s, %s,'
                            + '%s, %s)', args)
                element.clear()
        cur.close()
        self.conn.commit()

    def extractPostRow(self, element):
        return (
            element.attrib['Id'],
            element.attrib['PostTypeId'],
            element.attrib['ParentId'] if 'ParentId' in element.attrib else None,
            element.attrib['AcceptedAnswerId'] if 'AcceptedAnswerId' in element.attrib else None,
            element.attrib['Score'],
            element.attrib['Title'] if 'Title' in element.attrib else '',
            element.attrib['Body'] if 'Body' in element.attrib else None,
            element.attrib['CreationDate'],
            element.attrib['LastEditDate'] if 'LastEditDate' in element.attrib else None,
        )


if __name__ == "__main__":
    InsertXMLData()

import psycopg2
import xml.etree.cElementTree as ET


class InsertXMLData:

    def __init__(self):
        self.conn = psycopg2.connect("host=localhost dbname=examensarbete user=admin password=admin")

        self.insert_post_data('extractedPosts.xml')
        self.insert_comment_data('extractedComments.xml')

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
                cur.execute('INSERT INTO comments (id, post_id, text, creation_date)'
                            + ' SELECT %s, id, %s, %s from posts where id = %s', args)
                element.clear()
        cur.close()
        self.conn.commit()

    def insert_post_data(self, file):
        cur = self.conn.cursor()
        parser = ET.iterparse(file)
        amount = 0
        for event, element in parser:
            if event == 'end' and element.tag == 'row':
                amount += 1
                print("Post: ", amount)
                args = (
                    element.attrib['Id'],
                    element.attrib['PostTypeId'],
                    element.attrib['ParentId'] if 'ParentId' in element.attrib else None,
                    element.attrib['AcceptedAnswerId'] if 'AcceptedAnswerId' in element.attrib else None,
                    element.attrib['Score'],
                    element.attrib['ViewCount'] if 'ViewCount' in element.attrib else None,
                    element.attrib['AnswerCount'] if 'AnswerCount' in element.attrib else None,
                    element.attrib['Title'] if 'Title' in element.attrib else None,
                    element.attrib['Body'] if 'Body' in element.attrib else None,
                    element.attrib['CommentCount'],
                    element.attrib['CreationDate'],
                    element.attrib['LastEditDate'] if 'LastEditDate' in element.attrib else None,
                    element.attrib['LastActivityDate'],
                )

                cur.execute('INSERT INTO posts ('
                            + 'id, post_type, parent_id, accepted_answer,'
                            + 'score, view_count, answer_count, title,'
                            + 'body, comment_count, creation_date, last_edit_date,'
                            + 'last_activity_date) VALUES ('
                            + '%s, %s, %s, %s,'
                            + '%s, %s, %s, %s,'
                            + '%s, %s, %s, %s,'
                            + '%s)', args)
                element.clear()
        cur.close()
        self.conn.commit()


if __name__ == "__main__":
    InsertXMLData()

import sqlite3

# name = 'key_2_on_1_A'

class MDataBase:

    def __init__(self, name:str):
        # Connect to SQLite database (or create it if it doesn't exist)
        self.conn = sqlite3.connect('data/' + name + '.db')

        # Create a cursor object
        self.cur = self.conn.cursor()

        # Create a table to store key/value pairs if it doesn't exist
        self.cur.execute('''
            CREATE TABLE IF NOT EXISTS key_value_store (
                key TEXT PRIMARY KEY,
                nlayer INT,

                operator TEXT,
                opindex INTEGER,

                parentA TEXT,
                rotationA INT,
                
                parentB TEXT, 
                rotationB INT,
                ischeck BOOLEAN
            )
        ''')

    def commit(self):
        self.conn.commit()  

    def add_key_value(self, data:list) -> None:
        self.cur.execute('''
            INSERT OR REPLACE INTO key_value_store (key, nlayer, operator, parentA, rotationA, parentB, rotationB, opindex, ischeck)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, false)
        ''', (data[0],  data[1], data[2], data[3], data[4], data[5], data[6], data[7]))
    
    def get_all_keys(self) -> None:
        self.cur.execute('''
            SELECT DISTINCT(key) FROM key_value_store
        ''', ())
        rows = self.cur.fetchall()
        return [row[0] for row in rows]

    def get_n_layer_shapes_data(self, n:int) -> None:
        self.cur.execute('''
            SELECT * FROM key_value_store
            WHERE nlayer = ?
        ''', (n, ))
        rows = self.cur.fetchall()
        return rows


    def get_n_layer_shapes(self, n:int) -> None:
        self.cur.execute('''
            SELECT DISTINCT(key) FROM key_value_store
            WHERE nlayer = ?
        ''', (n, ))
        rows = self.cur.fetchall()
        return [row[0] for row in rows]
                    

    def search_key(self, key:str) -> None:
        self.cur.execute('''
            SELECT * FROM key_value_store
            WHERE key = ?
        ''', (key, ))
        row = self.cur.fetchone()
        print(row)
        key, nlayer, operator, parentA, rotationA, parentB, rotationB, opindex, ischeck = row
        return row

    def printLayer(self) -> None:
        print ("1 layers : ", len(self.get_n_layer_shapes(1)))
        print ("2 layers : ", len(self.get_n_layer_shapes(2)))
        print ("3 layers : ", len(self.get_n_layer_shapes(3)))
        print ("4 layers : ", len(self.get_n_layer_shapes(4)))

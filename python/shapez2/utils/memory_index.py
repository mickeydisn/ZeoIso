
from typing import List, Tuple
from typing_extensions import Self 

class MemoryIndex:
    
    def __init__(self):
        self.allKey = set()
        self.newKey = []
        self.keyChecked = []
        self.keyToCheck = []
        self.keyOneLayer = []
        self.keyNewOneLayer = []
        self.newLinkList = []

    def initBatch(self, allKey, keyToCheck, keyToStack):
        self.allKey = allKey
        self.keyOneLayer = keyToStack
        self.keyToCheck = keyToCheck

        self.print_db_count()

    # Function to check if a key exists
    def key_exists(self:Self, key: str) -> bool:
        return key in self.allKey

    # Function to get the first key with ischeck = False
    def get_first_keyToCheck(self:Self) -> str:
        return self.keyToCheck.pop() if self.keyToCheck else None

    # Function to set "ischeck" for an existing key
    def set_ischeck(self:Self, key: str) -> None:
        self.keyChecked.append(key)

    # Function to add or update a key/value pair
    def add_key_value(self:Self, key: str, value:object) -> None:
        if key == '--------':
            return
        
        if (key not in self.allKey):
            self.newLinkList.append(value)
            self.newKey.append(value)
            self.allKey.add(key)
            if False:
                if value[1] == 1: #  nlayer
                    self.keyNewOneLayer.append(key)
                if value[1] <= 2: #  nlayer
                    self.keyToCheck.append(key)

    # Function to get all the checked keys
    def print_db_count(self:Self) -> str:
        # Print the counts
        print(f"{'Total Link---':<30}{len(self.newLinkList):<10}")
        print(f"{'Total allKey':<30}{len(self.allKey):<10}")
        print(f"{'Total newKey':<30}{len(self.newKey):<10}")
        print(f"{'Total keyChecked':<30}{len(self.keyChecked):<10}")
        print(f"{'Total keyToCheck':<30}{len(self.keyToCheck):<10}")
        print(f"{'Total keyOneLayer':<30}{len(self.keyOneLayer):<10}")
        return ""

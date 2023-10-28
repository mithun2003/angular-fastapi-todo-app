from typing import Optional

from pydantic import BaseModel


class ItemBase(BaseModel):
    task: str


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    owner_id: int
    is_completed: Optional[bool] = False

    class Config:
        from_attributes  = True


class UserBase(BaseModel):
    name: str
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: Optional[bool] = True
    items: list[Item] = []

    class Config:
        from_attributes  = True

class UserLogin(BaseModel):
    email: str
    password: str
    
    class Config:
        from_attributes = True
        
class TokenData(BaseModel):
    id: str
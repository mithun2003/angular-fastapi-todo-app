from sqlalchemy.orm import Session
import models
import schemas
import utils

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):

    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session):
    return db.query(models.User).all()


def create_user(db: Session, user: schemas.UserCreate):
    user.password = utils.hash_password(user.password)
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_items(db: Session):
    return db.query(models.Todo).all()


def create_todo(db: Session, item: schemas.ItemCreate, user_id: int):
    # Convert the ItemCreate instance to a dictionary
    item_dict = item.dict()

    # Add the owner_id to the dictionary
    item_dict['owner_id'] = user_id

    # Create a new Todo object by passing the dictionary as keyword arguments
    db_item = models.Todo(**item_dict)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_items_user(db: Session, user_id: int):
    return db.query(models.Todo).filter(models.Todo.owner_id == user_id).all()

def get_todo(db: Session, id: int):
    return db.query(models.Todo).filter(models.Todo.id == id).first()

def update_todo(db: Session, id: int, is_completed: bool):
    todo = get_todo(db, id)
    if todo:
        todo.is_completed = is_completed
        db.commit()
        db.refresh(todo)
        return todo
    return None

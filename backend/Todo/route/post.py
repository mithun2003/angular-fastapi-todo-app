from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
import schemas
import crud
import oauth2


router = APIRouter(
    prefix='/todos',
    tags=['Todo']
)


@router.post("/create", response_model=schemas.Item)
def create_todo(todo: schemas.ItemCreate, db: Session = Depends(get_db), get_current_user: int =
                Depends(oauth2.get_current_user)):
    print(get_current_user)
    return crud.create_todo(db=db, item=todo, user_id=get_current_user.get('user_id'))


@router.get("/all", response_model=List[schemas.Item])
def read_todos(db: Session = Depends(get_db)):
    items = crud.get_items(db=db)
    if items is None:
        raise HTTPException(status_code=404, detail="No todo found")
    return items


@router.get("/", response_model=List[schemas.Item])
def read_todos( db: Session = Depends(get_db), get_current_user: int =
                Depends(oauth2.get_current_user)):
    items = crud.get_items_user(db=db, user_id=get_current_user.get('user_id'))
    if items is None:
        raise HTTPException(status_code=404, detail="No todo found")
    return items

@router.put("/update/{id}", response_model=schemas.Item)
def update_todo(id: int, is_completed: bool, db: Session = Depends(get_db), get_current_user: int =
                Depends(oauth2.get_current_user)):
    todo = crud.get_todo(db, id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return crud.update_todo(db, id, is_completed)
from jose import JWTError,jwt
from datetime import datetime,timedelta
import schemas
from fastapi import HTTPException, Depends,status
from fastapi.security.oauth2 import OAuth2PasswordBearer

oauth2_schema = OAuth2PasswordBearer(tokenUrl='login')


SECRET_KEY = "mithunthomas"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_TIME = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire_time = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_TIME)
    to_encode.update({"exp":expire_time})
    encoded_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credential_expection):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=ALGORITHM)
        user_id: int = payload.get('user_id')
        if user_id is None:
            raise credential_expection
    except JWTError:
        raise credential_expection
    return payload
    
def get_current_user(token: str = Depends(oauth2_schema)):
    credential_expection = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could\
                            not validate credential",headers={"WWW-Authenticate":"Bearer"})
    
    return verify_token(token,credential_expection)
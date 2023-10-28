from passlib.context import CryptContext

pwd_context = CryptContext(schemes=['bcrypt'],deprecated="auto")

def hash_password(password):
    hashed_password = pwd_context.hash(password)
    return hashed_password

def verify_password(password, hashed_password):
    return pwd_context.verify(password,hashed_password)
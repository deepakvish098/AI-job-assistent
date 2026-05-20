from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from app.database import Base, engine, SessionLocal
from app.models import User

def create_app():
    app = Flask(__name__)
    app.secret_key = 'your-secret-key-change-this'
    
    # Configure CORS to allow credentials (cookies)
    CORS(app, supports_credentials=True, origins=['http://localhost:5173', 'http://localhost:3000'])
    
    # Configure session
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    app.config['SESSION_COOKIE_SECURE'] = False  # Set to True if using HTTPS
    
    Base.metadata.create_all(engine)
    
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    
    @login_manager.user_loader
    def load_user(user_id):
        db = SessionLocal()
        user = db.query(User).get(int(user_id))
        db.close()
        return user

    from app.routes.jobs import jobs_bp
    from app.routes.resume import resume_bp
    from app.routes.auth import auth_bp
    from app.routes.api import api_bp

    app.register_blueprint(jobs_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(api_bp)

    return app

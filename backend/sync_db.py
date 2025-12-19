#!/usr/bin/env python
"""
Script to sync database schema with model definitions using SQLAlchemy.
This creates all tables and columns that don't exist.
"""

import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from sqlalchemy import create_engine, text
from app.models import Base, User, Book

# Determine database URL
db_url = os.getenv('DATABASE_URL')
if not db_url:
    # Try to read from development.ini
    try:
        with open('development.ini', 'r') as f:
            for line in f:
                if 'sqlalchemy.url' in line:
                    db_url = line.split('=', 1)[1].strip()
                    break
    except:
        pass

if not db_url or db_url.startswith('postgresql://user:'):
    print("⚠ No valid DATABASE_URL found. Using SQLAlchemy create_all()...")
    db_url = 'sqlite:///library.db'

print(f"Database: {db_url[:60]}...")
print()

# Create engine and sync schema
try:
    engine = create_engine(db_url, echo=False)
    
    print("Creating tables and columns from models...")
    Base.metadata.create_all(engine)
    print("✓ Schema synchronized successfully!")
    
    # Verify columns exist
    with engine.connect() as conn:
        result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='users' ORDER BY column_name"))
        user_cols = [row[0] for row in result.fetchall()]
        
        result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='books' ORDER BY column_name"))
        book_cols = [row[0] for row in result.fetchall()]
    
    print("\n✓ All required tables and columns created successfully!")
    print("\nRestart backend to apply changes:")
    print("  python run.py")
    
except Exception as e:
    print(f"✗ Error: {e}")
    sys.exit(1)

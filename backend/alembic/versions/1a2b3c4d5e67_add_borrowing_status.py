"""Add borrowing status column

Revision ID: 1a2b3c4d5e67
Revises: f65fe24b3b43
Create Date: 2025-12-19
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '1a2b3c4d5e67'
down_revision = 'f65fe24b3b43'
branch_labels = None
depends_on = None


def upgrade():
    status_enum = sa.Enum('pending', 'active', 'returned', 'denied', name='borrowstatus')
    status_enum.create(op.get_bind(), checkfirst=True)
    op.add_column('borrowings', sa.Column('status', status_enum, nullable=False, server_default='active'))

    # Existing rows: mark returned rows as returned, others as active
    op.execute("UPDATE borrowings SET status = 'returned' WHERE return_date IS NOT NULL")
    op.execute("UPDATE borrowings SET status = 'active' WHERE return_date IS NULL OR status IS NULL")

    # Remove server default to avoid future implicit defaults
    op.alter_column('borrowings', 'status', server_default=None)


def downgrade():
    op.drop_column('borrowings', 'status')
    status_enum = sa.Enum('pending', 'active', 'returned', 'denied', name='borrowstatus')
    status_enum.drop(op.get_bind(), checkfirst=True)

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('friend_requests', {
    id: { type: 'serial', primaryKey: true },
    sender_id: { type: 'integer', notNull: true },
    receiver_id: { type: 'integer', notNull: true },
    status: { type: 'varchar(20)', default: 'pending' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });


  pgm.addConstraint('friend_requests', 'fk_sender_id', {
    foreignKeys: {
      columns: ['sender_id'],
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('friend_requests', 'fk_receiver_id', {
    foreignKeys: {
      columns: ['receiver_id'],
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('friend_requests');
};
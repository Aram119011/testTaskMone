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
  // Creating 'friends' table
  pgm.createTable('friends', {
    user_id: { type: 'integer', notNull: true },
    friend_id: { type: 'integer', notNull: true },
  });

  pgm.addConstraint('friends', 'fk_user_id', {
    foreignKeys: {
      columns: ['user_id'],
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('friends', 'fk_friend_id', {
    foreignKeys: {
      columns: ['friend_id'],
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
  pgm.dropTable('friends');
};
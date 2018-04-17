var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * S Model
 * ==========
 */
var S = new keystone.List('S');

S.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
S.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
S.defaultColumns = 'name, email, isAdmin';
S.register();

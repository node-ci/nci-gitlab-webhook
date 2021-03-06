'use strict';

var expect = require('expect.js');
var rewire = require('rewire');

var lib = rewire('../../../lib');
var GitlabWebhook = lib.__get__('GitlabWebhook');

var describeTitle = 'GitlabWebhook.check with note webhook request and ' +
	'wrong note content';
describe(describeTitle, function() {
	var initialArgs = {
		req: {
			headers: {
				'x-gitlab-event': 'Note Hook'
			},
			body: {
				object_attributes: {
					noteable_type: 'MergeRequest',
					note: 'wrong message'
				},
				merge_request: {
					source_branch: 'test-branch'
				}
			}
		},
		project: {}
	};

	it('should return falsy value', function() {
		var webhook = new GitlabWebhook();
		var result = webhook.check(initialArgs.req, initialArgs.project);

		expect(result).not.ok();
	});
});

import * as core from '@actions/core';
import { context, } from '@actions/github';

const FRONTEND_PREFIX = core.getInput('pr-e2e-frontend-label-prefix', { required: true });
const BACKEND_PREFIX = core.getInput('pr-e2e-backend-label-prefix', { required: true });

function run() {
  if (context.eventName !== 'pull_request') {
    // Build and run E2E for all other events.
    // TODO: Maybe handle commit message like "feat(frontend-only): Some message"

    core.setOutput('should-build-frontend', true);
    core.setOutput('should-build-backend', true);
    core.setOutput('e2e-reuse-frontend', false);
    core.setOutput('e2e-reuse-backend', false);
    return;
  }

  let label
  if (!!(label = findPRLabel(label => label.name.startsWith(FRONTEND_PREFIX)))) {
    core.setOutput('should-build-frontend', false);
    core.setOutput('e2e-reuse-frontend', label.name.slice(FRONTEND_PREFIX.length));
    core.info(`E2E Frontend reuse: ${label.name.slice(FRONTEND_PREFIX.length)}`);
  } else {
    core.setOutput('should-build-frontend', true);
    core.setOutput('e2e-reuse-frontend', false);
  }
  if (!!(label = findPRLabel(label => label.name.startsWith(BACKEND_PREFIX)))) {
    core.setOutput('should-build-backend', false);
    core.setOutput('e2e-reuse-backend', label.name.slice(BACKEND_PREFIX.length));
    core.info(`E2E Backend reuse: ${label.name.slice(BACKEND_PREFIX.length)}`);
  } else {
    core.setOutput('should-build-backend', true);
    core.setOutput('e2e-reuse-backend', false);
  }
}

function findPRLabel(test) {
  return context.payload.pull_request.labels.find(test);
}

run();

import fs from 'fs';
import showdown from 'showdown';

/**
 * Gets the content of the Borum Jot privacy policy as HTML
 * by using showdown library
 * @returns {string} The content of the privacy policy
 */
async function getPrivacyPolicyContent() {
  let fileContents = fs.readFileSync('documents/privacypolicy.md', 'utf8'); // Get markdown
  fileContents = new showdown.Converter().makeHtml(fileContents); // Convert to html

  return fileContents;
}

export { getPrivacyPolicyContent }
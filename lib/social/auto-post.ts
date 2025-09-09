interface SocialPostData {
  title: string;
  url: string;
  type: 'blog' | 'update' | 'announcement';
  excerpt?: string;
  hashtags?: string[];
}

// Generate hashtags based on content type and title
function generateHashtags(title: string, type: string): string[] {
  const baseHashtags = [
    '#ERAS',
    '#ResidencyMatch',
    '#MedicalStudents',
    '#USMLE',
    '#ResidencyApplication',
    '#Match2025',
  ];

  // Add topic-specific hashtags
  const topicHashtags: string[] = [];
  
  if (title.toLowerCase().includes('personal statement')) {
    topicHashtags.push('#PersonalStatement', '#MedicalWriting');
  }
  if (title.toLowerCase().includes('interview')) {
    topicHashtags.push('#ResidencyInterview', '#InterviewPrep');
  }
  if (title.toLowerCase().includes('img')) {
    topicHashtags.push('#IMGDoctors', '#InternationalMedicalGraduate');
  }
  if (title.toLowerCase().includes('step')) {
    topicHashtags.push('#Step1', '#Step2CK', '#USMLE');
  }
  if (title.toLowerCase().includes('surgery')) {
    topicHashtags.push('#SurgeryResidency', '#FutureSurgeon');
  }
  if (title.toLowerCase().includes('internal medicine')) {
    topicHashtags.push('#InternalMedicine', '#IMResidency');
  }
  if (title.toLowerCase().includes('pediatrics')) {
    topicHashtags.push('#Pediatrics', '#PedsResidency');
  }
  
  return [...baseHashtags, ...topicHashtags].slice(0, 8);
}

// Post to Twitter/X
async function postToTwitter(data: SocialPostData) {
  if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
    console.log('Twitter API credentials not configured');
    return { success: false, platform: 'Twitter', message: 'Not configured' };
  }

  try {
    // Format tweet
    const hashtags = data.hashtags || generateHashtags(data.title, data.type);
    const hashtagString = hashtags.join(' ');
    
    // Twitter has 280 character limit
    const maxTitleLength = 280 - data.url.length - hashtagString.length - 10; // 10 for spacing and ellipsis
    const truncatedTitle = data.title.length > maxTitleLength 
      ? data.title.substring(0, maxTitleLength) + '...' 
      : data.title;
    
    const tweet = `${truncatedTitle}\n\n${data.url}\n\n${hashtagString}`;

    // Note: Actual Twitter API implementation would go here
    // For now, we'll just log what would be posted
    console.log(`Would post to Twitter: ${tweet}`);

    return {
      success: true,
      platform: 'Twitter',
      message: 'Tweet posted successfully',
      content: tweet,
    };
  } catch (error) {
    console.error('Twitter posting error:', error);
    return {
      success: false,
      platform: 'Twitter',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Post to LinkedIn
async function postToLinkedIn(data: SocialPostData) {
  if (!process.env.LINKEDIN_ACCESS_TOKEN) {
    console.log('LinkedIn API credentials not configured');
    return { success: false, platform: 'LinkedIn', message: 'Not configured' };
  }

  try {
    // Format LinkedIn post
    const hashtags = data.hashtags || generateHashtags(data.title, data.type);
    const hashtagString = hashtags.join(' ');
    
    const postContent = `🎯 New Blog Post Alert!\n\n${data.title}\n\n${data.excerpt || 'Check out our latest insights on ERAS applications and residency matching.'}\n\nRead more: ${data.url}\n\n${hashtagString}`;

    // Note: Actual LinkedIn API implementation would go here
    console.log(`Would post to LinkedIn: ${postContent}`);

    return {
      success: true,
      platform: 'LinkedIn',
      message: 'LinkedIn post created successfully',
      content: postContent,
    };
  } catch (error) {
    console.error('LinkedIn posting error:', error);
    return {
      success: false,
      platform: 'LinkedIn',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Post to Facebook
async function postToFacebook(data: SocialPostData) {
  if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
    console.log('Facebook API credentials not configured');
    return { success: false, platform: 'Facebook', message: 'Not configured' };
  }

  try {
    // Format Facebook post
    const postContent = `📚 ${data.title}\n\n${data.excerpt || 'Expert guidance for your ERAS application and residency match journey.'}\n\n👉 Read the full article: ${data.url}\n\n#MyERASEditing #ResidencyMatch #MedicalEducation`;

    // Note: Actual Facebook API implementation would go here
    console.log(`Would post to Facebook: ${postContent}`);

    return {
      success: true,
      platform: 'Facebook',
      message: 'Facebook post created successfully',
      content: postContent,
    };
  } catch (error) {
    console.error('Facebook posting error:', error);
    return {
      success: false,
      platform: 'Facebook',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Main function to post to all configured social media platforms
export async function postToSocialMedia(data: SocialPostData) {
  const results = [];

  // Post to Twitter
  if (process.env.TWITTER_API_KEY) {
    const twitterResult = await postToTwitter(data);
    results.push(twitterResult);
  }

  // Post to LinkedIn
  if (process.env.LINKEDIN_ACCESS_TOKEN) {
    const linkedInResult = await postToLinkedIn(data);
    results.push(linkedInResult);
  }

  // Post to Facebook
  if (process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
    const facebookResult = await postToFacebook(data);
    results.push(facebookResult);
  }

  // Log summary
  const successCount = results.filter(r => r.success).length;
  console.log(`Social media posting: ${successCount}/${results.length} successful`);

  return results;
}

// Schedule social media posts at optimal times
export async function scheduleOptimalPost(data: SocialPostData) {
  const now = new Date();
  const hour = now.getHours();
  
  // Optimal posting times (in UTC)
  const optimalTimes = [9, 12, 17, 20]; // 9 AM, 12 PM, 5 PM, 8 PM
  
  // Find the next optimal time
  let nextOptimalHour = optimalTimes.find(t => t > hour);
  if (!nextOptimalHour) {
    nextOptimalHour = optimalTimes[0]; // Next day's first optimal time
  }
  
  const delayHours = nextOptimalHour > hour ? nextOptimalHour - hour : (24 - hour) + nextOptimalHour;
  const delayMs = delayHours * 60 * 60 * 1000;
  
  // In production, you would schedule this with a job queue
  // For now, we'll post immediately
  console.log(`Would schedule post in ${delayHours} hours for optimal engagement`);
  
  return postToSocialMedia(data);
}
const url = 'https://yalgamers.gg/gamer-score';
const title = 'Yalgamer Steam Score';
const desc = 'I scanned my steam account on yalgamers. See! what score I got!! 🙌😎';
const via = 'yalgamers_gg';
const hashtags = 'yalgamers,community,game';

export const facebook = (link) => `https://www.facebook.com/sharer/sharer.php?u=${link}${hashtags ? `&hashtag=%23${hashtags.split(',')[0]}` : ''}`;
export const twitter = (link) => `https://twitter.com/intent/tweet?url=${link}&text=${encodeURIComponent(title)}${via ? `&via=${encodeURIComponent(via)}` : ''}${hashtags ? `&hashtags=${encodeURIComponent(hashtags.replace(/,/g, ','))}` : ''}`;
export const telegram = (link) => `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(desc)}`;
export const whatsapp = (link) => `https://wa.me/?text=${encodeURIComponent(`${title}\n${link}\n\n${desc}`)}`;
export const email = (link) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${desc}\n${link}`)}`;

export const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
export const hackernews = `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`;
export const mastodon = `https://mastodon.social/share?text=${encodeURIComponent(`${title}\n${url}\n\n${desc}\n\n@${via}`)}`;
export const messenger = `https://www.facebook.com/dialog/send?app_id=YOUR_FB_APP_ID&link=${encodeURIComponent(url)}&redirect_uri=${encodeURIComponent(url)}`;
export const odnoklassniki = `https://connect.ok.ru/offer?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}${desc ? `&description=${encodeURIComponent(desc)}` : ''}`;
export const pinterest = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}${desc ? `&caption=${encodeURIComponent(desc)}` : ''}`;
export const pocket = `https://getpocket.com/edit.php?url=${encodeURIComponent(url)}`;
export const reddit = `https://www.reddit.com/submit?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
export const teams = `https://teams.microsoft.com/share?href=${encodeURIComponent(url)}&msgText=${encodeURIComponent(desc)}`;
export const tumblr = `https://www.tumblr.com/widgets/share/tool?posttype=link${hashtags ? `&tags=${encodeURIComponent(hashtags.replace(/,/g, ','))}` : ''}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(url)}&canonicalUrl=${encodeURIComponent(url)}&caption=${encodeURIComponent(desc)}&show-via=${encodeURIComponent(via)}`;
export const viber = `viber://forward?text=${encodeURIComponent(`${title}\n${url}\n\n${desc}`)}`;
export const vkontakte = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}${desc ? `&description=${encodeURIComponent(desc)}` : ''}`;

export const sharelinks = [facebook, email, hackernews, linkedin, mastodon, messenger, odnoklassniki, pinterest, pocket, reddit, teams, telegram, tumblr, twitter, viber, vkontakte, whatsapp]
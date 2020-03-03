
var documents = [{
    "id": 0,
    "url": "https://shonaka.github.io/404.html",
    "title": "",
    "body": " 404 Page not found :(  The requested page could not be found. "
    }, {
    "id": 1,
    "url": "https://shonaka.github.io/about/",
    "title": "About Me",
    "body": "This is where you put the contents of your About page. Like all your pages, it’s in Markdown format. This website is powered by fastpages 1.       a blogging platform that natively supports Jupyter notebooks in addition to other formats.  &#8617;    "
    }, {
    "id": 2,
    "url": "https://shonaka.github.io/categories/",
    "title": "Tags",
    "body": "Contents: {% if site. categories. size &gt; 0 %} {% for category in site. categories %} {% capture category_name %}{{ category | first }}{% endcapture %} {{ category_name }}{% endfor %}{% endif %} {% for category in site. categories %}  {% capture category_name %}{{ category | first }}{% endcapture %} &lt;h3 id = {{ category_name }} &gt;&lt;i class= fas fa-tags category-tags-icon &gt;&lt;/i&gt;&lt;/i&gt; {{ category_name }}&lt;/h3&gt;&lt;a name= {{ category_name | slugize }} &gt;&lt;/a&gt;{% for post in site. categories[category_name] %}{%- assign date_format = site. minima. date_format | default:  %b %-d, %Y  -%}&lt;article class= archive-item &gt; &lt;p class= post-meta post-meta-title &gt;&lt;a class= page-meta  href= {{ site. baseurl }}{{ post. url }} &gt;{{post. title}}&lt;/a&gt; • {{ post. date | date: date_format }}&lt;/p&gt;&lt;/article&gt;{% endfor %} {% endfor %}"
    }, {
    "id": 3,
    "url": "https://shonaka.github.io/images/copied_from_nb/",
    "title": "",
    "body": "WarningDo not manually save images into this folder. This is used by GitHub Actions to automatically copy images.  Any images you save into this folder could be deleted at build time. "
    }, {
    "id": 4,
    "url": "https://shonaka.github.io/jupyter/bayesian/stats_rethinking/2020/03/03/stats1.html",
    "title": "Statistical Rethinking Ch 2 Bayesian Modeling",
    "body": "2020/03/03 -           About&#182;Statistical rethinking is an excellent book/course about Bayesian learning for beginners. I would recommend:Read the chapterWatch the youtube video for the corresponding chapterImplement and run the code    Important: I would highly recommend spending some time on Chapter 2 and 3 as they are the foundations## Corresponding Youtube VideoChapter 2&#182;Overview&#182;: Chapter 2 covers the basics of Bayesian inference. It's pretty much summarized in one sentence as indicated below. I will not cover this part so if you are not sure what the following means, check the textbook and the youtube video.     Important: Bayesian inference is really just counting and comparing of possibilities. - This chapter also covers Bayesian modeling. This is the fundamental part that I'm going to cover and spend most time on. Bayesian Modeling&#182;: Problem statement:Randomly sample a point from a world mapIs the point land(=L) or water(=W)? There's nothing else. It has to be either L or W. So it's binomial. Can we figure out a good estimate of the world from these samples?For example, given the collected samples, how much portion of the world is water? 30%? 60%?Sample N = 1&#182;: Let's start from the beginning. You randomly sampled a sample from the world map. It was water(=W). To understand the world with probability, we could try plotting the probability of water vs plausibility plot like below. Let me explain about this figure a bit. First, you have proportion of water or probability of water in the x-axis. You have the plausibility that tells you how likely that is the case in the y-axis. Check out the previous plausibility. This is shown as a dashed line. Previous plausibility means before randomly sampling anything. You have no idea what's the plausibility of water with respect to (w. r. t. ) the proportion of water. In other words, every proportion in x-axis is likely plausible before sampling anything and that's why it's a straight line. Next, look at the current plausibility. Things have changed here. Now you have one sample, which was water(=W) out of N = 1 total sample. Notice that now the plausibility w. r. t. the proportion of water = 0 is zero. Why? because you observed that there is water by sampling water. Therefore, there's no way the proportion of water is zero now. Don't worry if you don't get it by now, let's look at the next example. Sample N = 2&#182;: Previously, we sampled water(=W). With one sample, it's impossible to understand the underlying probability distribution of the problem. Let's keep sampling to understand more about the world. This time, you sampled land(=L). So now you have W, L, two samples. It's becoming more interesting. At the second sample, you observed land(=L) and you have already observed water(=W) in the first sample. Now you know that the plausibility w. r. t. the proportion of water = 1 is zero too. Why? Think this way. If the world is covered with full of water with no land, then yeah surely the proportion of water = 1 is plausible. But in that case, you won't observe land. Since you observed land in the second sample, this distopian scenario of the world covered with full of water is no longer valid. Thank god! Instead, what's more plausible is the proportion of water = 0. 5. This is because out of 2 samples, you have 1 water and 1 land. It's like flipping a coin now. Without knowing what's a coin is, but you were told that you have 1 head and 1 tail, how do approximate the probability of the next one being head? Probably 50:50, right? Sample N = 3 to 9&#182;: From here on, you should be able to pretty much understand what the plot indicates. Take some time to see if the below plots make sense to you given the sequences of samples: W, L, W, W, W, L, W, L, W So now you have 9 samples in total. Of which 6 water and 3 land. You can now see that every time we get a sample (either L or W), the probability distribution gets updated to represent the underlying distribution of the world as accurate as it can (I'll talk about how exactly to calculate these in a moment). If you look at the last N = 9, you see the peak somewhere around 0. 65 ish. This should be intuitive because you got 6 W out of 9 total samples. Which is 6/9 = 0. 666. . . The most likely representation of the world given only 9 samples. Breaking down Bayesian modeling&#182;: By now, you might be wondering.  Yeah, I think I got the concept. It's a toy problem. Easy! But how exactly can we compute and plot the graph?  This is the section with equations. You might already know the Bayes rule: $$\underbrace{P(A|B)}_\text{Posterior}=\frac{\overbrace{P(B|A)}^\text{Likelihood} \times \overbrace{P(A)}^\text{Prior}}{\underbrace{P(B)}_\text{Marginal}}$$In the figures above, all I was doing is the following: Calculate the likelihood given the new sampleCalculate the prior (or get the previous posterior)Multiply the twoDivide it by the marginal to standardize so it becomes posterior probabilityLikelihood&#182;: First, let's get started with likelihood. Likelihood is described as    Important: a mathematical formula that specified the plausibility of the data. In the toy example, given the assumption that each of the random sampling is independent from each other and the probability of getting a sample does not change (the world doesn't change), we could treat the problem as the binomial distribution. $$Pr(x|n,p) = \frac{n!}{(n-x)!x!} p^x (1-p)^{n-x}$$where $x$: the count of an event (e. g. water)$n$: total count of events$p$: probability of getting $x$      # Define the distribution with parametersd = dist. Binomial(total_count=9, probs=0. 5)# Say we drew 6 samples out of 9 total samplesx = 6# Evaluate log probability of xp = d. log_prob(x)# Convert back to a normal probability by taking the exponentiallikelihood = np. exp(p)# Now all togetherlikelihood = np. exp(dist. Binomial(total_count=9, probs=0. 5). log_prob(6))print(likelihood)  0. 16406256  Note that for the probability of p, we are just setting it to 0. 5 here. This corresponds to the x-axis (proportion of water) in the previous plots. Imagine calculating the likelihood at a certain point in x-axis which is 0. 5. The above value in likelihood is the likelihood of water if the probability of water appearing is 0. 5 and we sampled 6 water out of 9 total samples. Prior&#182;: Now the prior. This is where you can give some information about the prior distribution. I talked a bit before in the plot with example N = 1 where the dashed line was flat. This was because before sampling anything, there's no information about the world, so the plausibility of water in any probability is equally likely = flat line. We can model this flat line as an uniform distribution: $$Pr(p) = \frac{1}{b - a}$$where $a$: minimum probability$b$: maximum probability      np. exp(dist. Binomial(total_count=9, probs=0. 5). log_prob(6))  DeviceArray(0. 16406256, dtype=float32)        dist. Binomial(total_count=9, probs=0. 5). log_prob(6)  DeviceArray(-1. 8075075, dtype=float32)        dir(dist. Binomial(total_count=9, probs=0. 5))  [&#39;__call__&#39;, &#39;__class__&#39;, &#39;__delattr__&#39;, &#39;__dict__&#39;, &#39;__dir__&#39;, &#39;__doc__&#39;, &#39;__eq__&#39;, &#39;__format__&#39;, &#39;__ge__&#39;, &#39;__getattribute__&#39;, &#39;__gt__&#39;, &#39;__hash__&#39;, &#39;__init__&#39;, &#39;__init_subclass__&#39;, &#39;__le__&#39;, &#39;__lt__&#39;, &#39;__module__&#39;, &#39;__ne__&#39;, &#39;__new__&#39;, &#39;__reduce__&#39;, &#39;__reduce_ex__&#39;, &#39;__repr__&#39;, &#39;__setattr__&#39;, &#39;__sizeof__&#39;, &#39;__str__&#39;, &#39;__subclasshook__&#39;, &#39;__weakref__&#39;, &#39;_batch_shape&#39;, &#39;_event_shape&#39;, &#39;_validate_args&#39;, &#39;_validate_sample&#39;, &#39;arg_constraints&#39;, &#39;batch_shape&#39;, &#39;event_shape&#39;, &#39;log_prob&#39;, &#39;mean&#39;, &#39;probs&#39;, &#39;reparametrized_params&#39;, &#39;sample&#39;, &#39;sample_with_intermediates&#39;, &#39;set_default_validate_args&#39;, &#39;support&#39;, &#39;to_event&#39;, &#39;total_count&#39;, &#39;transform_with_intermediates&#39;, &#39;variance&#39;]        dist. Binomial(total_count=9, probs=0. 5). probs(6)  ---------------------------------------------------------------------------TypeError                 Traceback (most recent call last)&lt;ipython-input-10-bf7933c10481&gt; in &lt;module&gt;----&gt; 1 dist. Binomial(total_count=9, probs=0. 5). probs(6)TypeError: &#39;float&#39; object is not callable        # define grid (0 to 1, evenly separated 20 points)probability_grid = np. linspace(start=0, stop=1, num=20)# define prior distributionprior = np. ones(20)# compute likelihood at each value in gridlikelihood = np. exp(  dist. Binomial(    total_count=1,    probs=probability_grid  ). log_prob(1))# compute product of likelihood and priorunstandardized_posterior = likelihood * prior# standardize the posterior, so it sums to 1posterior = unstandardized_posterior / np. sum(unstandardized_posterior)                 #collapse-hideplt. plot(probability_grid, posterior, &quot;-o&quot;)plt. xlabel(&quot;probability of water&quot;)plt. ylabel(&quot;posterior probability&quot;)plt. title(&quot;Computing posterior distribution by grid approximation: 20 points&quot;);       "
    }, {
    "id": 5,
    "url": "https://shonaka.github.io/jupyter/2020/02/20/test2.html",
    "title": "Fastpages Notebook Blog Post",
    "body": "2020/02/20 -           About&#182;This notebook is a demonstration of some of capabilities of fastpages with notebooks. With fastpages you can save your jupyter notebooks into the _notebooks folder at the root of your repository, and they will be automatically be converted to Jekyll compliant blog posts! Front Matter&#182;: Front Matter is a markdown cell at the beginning of your notebook that allows you to inject metadata into your notebook. For example: Setting toc: true will automatically generate a table of contentsSetting badges: true will automatically include GitHub and Google Colab links to your notebook. Setting comments: true will enable commenting on your blog post, powered by utterances. More details and options for front matter can be viewed on the front matter section of the README. Markdown Shortcuts&#182;: put a #hide flag at the top of any cell you want to completely hide in the docs put a #collapse-hide flag at the top of any cell if you want to hide that cell by default, but give the reader the option to show it:              #collapse-hideimport pandas as pdimport altair as alt       put a #collapse-show flag at the top of any cell if you want to show that cell by default, but give the reader the option to hide it:              #collapse-showcars = &#39;https://vega. github. io/vega-datasets/data/cars. json&#39;movies = &#39;https://vega. github. io/vega-datasets/data/movies. json&#39;sp500 = &#39;https://vega. github. io/vega-datasets/data/sp500. csv&#39;stocks = &#39;https://vega. github. io/vega-datasets/data/stocks. csv&#39;flights = &#39;https://vega. github. io/vega-datasets/data/flights-5k. json&#39;       Interactive Charts With Altair&#182;: Charts made with Altair remain interactive.  Example charts taken from this repo, specifically this notebook. Example 1: DropDown&#182;:       # single-value selection over [Major_Genre, MPAA_Rating] pairs# use specific hard-wired values as the initial selected valuesselection = alt. selection_single(  name=&#39;Select&#39;,  fields=[&#39;Major_Genre&#39;, &#39;MPAA_Rating&#39;],  init={&#39;Major_Genre&#39;: &#39;Drama&#39;, &#39;MPAA_Rating&#39;: &#39;R&#39;},  bind={&#39;Major_Genre&#39;: alt. binding_select(options=genres), &#39;MPAA_Rating&#39;: alt. binding_radio(options=mpaa)}) # scatter plot, modify opacity based on selectionalt. Chart(movies). mark_circle(). add_selection(  selection). encode(  x=&#39;Rotten_Tomatoes_Rating:Q&#39;,  y=&#39;IMDB_Rating:Q&#39;,  tooltip=&#39;Title:N&#39;,  opacity=alt. condition(selection, alt. value(0. 75), alt. value(0. 05)))    Example 2: Tooltips&#182;:       alt. Chart(movies). mark_circle(). add_selection(  alt. selection_interval(bind=&#39;scales&#39;, encodings=[&#39;x&#39;])). encode(  x=&#39;Rotten_Tomatoes_Rating:Q&#39;,  y=alt. Y(&#39;IMDB_Rating:Q&#39;, axis=alt. Axis(minExtent=30)), # use min extent to stabilize axis title placement  tooltip=[&#39;Title:N&#39;, &#39;Release_Date:N&#39;, &#39;IMDB_Rating:Q&#39;, &#39;Rotten_Tomatoes_Rating:Q&#39;]). properties(  width=600,  height=400)    Example 3: More Tooltips&#182;:       # select a point for which to provide details-on-demandlabel = alt. selection_single(  encodings=[&#39;x&#39;], # limit selection to x-axis value  on=&#39;mouseover&#39;, # select on mouseover events  nearest=True,  # select data point nearest the cursor  empty=&#39;none&#39;   # empty selection includes no data points)# define our base line chart of stock pricesbase = alt. Chart(). mark_line(). encode(  alt. X(&#39;date:T&#39;),  alt. Y(&#39;price:Q&#39;, scale=alt. Scale(type=&#39;log&#39;)),  alt. Color(&#39;symbol:N&#39;))alt. layer(  base, # base line chart    # add a rule mark to serve as a guide line  alt. Chart(). mark_rule(color=&#39;#aaa&#39;). encode(    x=&#39;date:T&#39;  ). transform_filter(label),    # add circle marks for selected time points, hide unselected points  base. mark_circle(). encode(    opacity=alt. condition(label, alt. value(1), alt. value(0))  ). add_selection(label),  # add white stroked text to provide a legible background for labels  base. mark_text(align=&#39;left&#39;, dx=5, dy=-5, stroke=&#39;white&#39;, strokeWidth=2). encode(    text=&#39;price:Q&#39;  ). transform_filter(label),  # add text labels for stock prices  base. mark_text(align=&#39;left&#39;, dx=5, dy=-5). encode(    text=&#39;price:Q&#39;  ). transform_filter(label),    data=stocks). properties(  width=700,  height=400)    Data Tables&#182;: You can display tables per the usual way in your blog:       movies = &#39;https://vega. github. io/vega-datasets/data/movies. json&#39;df = pd. read_json(movies)# display table with pandasdf[[&#39;Title&#39;, &#39;Worldwide_Gross&#39;,   &#39;Production_Budget&#39;, &#39;IMDB_Rating&#39;]]. head()           Title   Worldwide_Gross   Production_Budget   IMDB_Rating         0   The Land Girls   146083. 0   8000000. 0   6. 1       1   First Love, Last Rites   10876. 0   300000. 0   6. 9       2   I Married a Strange Person   203134. 0   250000. 0   6. 8       3   Let's Talk About Sex   373615. 0   300000. 0   NaN       4   Slam   1087521. 0   1000000. 0   3. 4     Images&#182;: Local Images&#182;: You can reference local images and they will be copied and rendered on your blog automatically.  You can include these with the following markdown syntax: ![](my_icons/fastai_logo. png) Remote Images&#182;: Remote images can be included with the following markdown syntax: ![](https://image. flaticon. com/icons/svg/36/36686. svg) Animated Gifs&#182;: Animated Gifs work, too! ![](https://upload. wikimedia. org/wikipedia/commons/7/71/ChessPawnSpecialMoves. gif) Captions&#182;: You can include captions with markdown images like this: ![](https://www. fast. ai/images/fastai_paper/show_batch. png  Credit: https://www. fast. ai/2020/02/13/fastai-A-Layered-API-for-Deep-Learning/ ) Other Elements&#182;Tweetcards&#182;: Typing &gt; twitter: https://twitter. com/jakevdp/status/1204765621767901185?s=20 will render this:Altair 4. 0 is released! https://t. co/PCyrIOTcvvTry it with: pip install -U altairThe full list of changes is at https://t. co/roXmzcsT58 . . . read on for some highlights. pic. twitter. com/vWJ0ZveKbZ &mdash; Jake VanderPlas (@jakevdp) December 11, 2019 Youtube Videos&#182;: Typing &gt; youtube: https://youtu. be/XfoYk_Z5AkI will render this: Boxes / Callouts&#182;: Typing &gt; Warning: There will be no second warning! will render this:    Warning: There will be no second warning! Typing &gt; Important: Pay attention! It's important. will render this:    Important: Pay attention! It&#8217;s important. Typing &gt; Tip: This is my tip. will render this:    Tip: This is my tip. Typing &gt; Note: Take note of this. will render this:    Note: Take note of this. Typing &gt; Note: A doc link to [an example website: fast. ai](https://www. fast. ai/) should also work fine. will render in the docs:    Note: A doc link to an example website: fast. ai should also work fine. Footnotes&#182;: You can have footnotes in notebooks just like you can with markdown. For example, here is a footnote 1. This is the footnote. &#8617; "
    }, {
    "id": 6,
    "url": "https://shonaka.github.io/jupyter/2020/02/20/test.html",
    "title": "Fastpages Notebook Blog Post",
    "body": "2020/02/20 -           About&#182;This notebook is a demonstration of some of capabilities of fastpages with notebooks. With fastpages you can save your jupyter notebooks into the _notebooks folder at the root of your repository, and they will be automatically be converted to Jekyll compliant blog posts! Front Matter&#182;: Front Matter is a markdown cell at the beginning of your notebook that allows you to inject metadata into your notebook. For example: Setting toc: true will automatically generate a table of contentsSetting badges: true will automatically include GitHub and Google Colab links to your notebook. Setting comments: true will enable commenting on your blog post, powered by utterances. More details and options for front matter can be viewed on the front matter section of the README. Markdown Shortcuts&#182;: put a #hide flag at the top of any cell you want to completely hide in the docs put a #collapse-hide flag at the top of any cell if you want to hide that cell by default, but give the reader the option to show it:              #collapse-hideimport pandas as pdimport altair as alt       put a #collapse-show flag at the top of any cell if you want to show that cell by default, but give the reader the option to hide it:              #collapse-showcars = &#39;https://vega. github. io/vega-datasets/data/cars. json&#39;movies = &#39;https://vega. github. io/vega-datasets/data/movies. json&#39;sp500 = &#39;https://vega. github. io/vega-datasets/data/sp500. csv&#39;stocks = &#39;https://vega. github. io/vega-datasets/data/stocks. csv&#39;flights = &#39;https://vega. github. io/vega-datasets/data/flights-5k. json&#39;       Interactive Charts With Altair&#182;: Charts made with Altair remain interactive.  Example charts taken from this repo, specifically this notebook. Example 1: DropDown&#182;:       # single-value selection over [Major_Genre, MPAA_Rating] pairs# use specific hard-wired values as the initial selected valuesselection = alt. selection_single(  name=&#39;Select&#39;,  fields=[&#39;Major_Genre&#39;, &#39;MPAA_Rating&#39;],  init={&#39;Major_Genre&#39;: &#39;Drama&#39;, &#39;MPAA_Rating&#39;: &#39;R&#39;},  bind={&#39;Major_Genre&#39;: alt. binding_select(options=genres), &#39;MPAA_Rating&#39;: alt. binding_radio(options=mpaa)}) # scatter plot, modify opacity based on selectionalt. Chart(movies). mark_circle(). add_selection(  selection). encode(  x=&#39;Rotten_Tomatoes_Rating:Q&#39;,  y=&#39;IMDB_Rating:Q&#39;,  tooltip=&#39;Title:N&#39;,  opacity=alt. condition(selection, alt. value(0. 75), alt. value(0. 05)))    Example 2: Tooltips&#182;:       alt. Chart(movies). mark_circle(). add_selection(  alt. selection_interval(bind=&#39;scales&#39;, encodings=[&#39;x&#39;])). encode(  x=&#39;Rotten_Tomatoes_Rating:Q&#39;,  y=alt. Y(&#39;IMDB_Rating:Q&#39;, axis=alt. Axis(minExtent=30)), # use min extent to stabilize axis title placement  tooltip=[&#39;Title:N&#39;, &#39;Release_Date:N&#39;, &#39;IMDB_Rating:Q&#39;, &#39;Rotten_Tomatoes_Rating:Q&#39;]). properties(  width=600,  height=400)    Example 3: More Tooltips&#182;:       # select a point for which to provide details-on-demandlabel = alt. selection_single(  encodings=[&#39;x&#39;], # limit selection to x-axis value  on=&#39;mouseover&#39;, # select on mouseover events  nearest=True,  # select data point nearest the cursor  empty=&#39;none&#39;   # empty selection includes no data points)# define our base line chart of stock pricesbase = alt. Chart(). mark_line(). encode(  alt. X(&#39;date:T&#39;),  alt. Y(&#39;price:Q&#39;, scale=alt. Scale(type=&#39;log&#39;)),  alt. Color(&#39;symbol:N&#39;))alt. layer(  base, # base line chart    # add a rule mark to serve as a guide line  alt. Chart(). mark_rule(color=&#39;#aaa&#39;). encode(    x=&#39;date:T&#39;  ). transform_filter(label),    # add circle marks for selected time points, hide unselected points  base. mark_circle(). encode(    opacity=alt. condition(label, alt. value(1), alt. value(0))  ). add_selection(label),  # add white stroked text to provide a legible background for labels  base. mark_text(align=&#39;left&#39;, dx=5, dy=-5, stroke=&#39;white&#39;, strokeWidth=2). encode(    text=&#39;price:Q&#39;  ). transform_filter(label),  # add text labels for stock prices  base. mark_text(align=&#39;left&#39;, dx=5, dy=-5). encode(    text=&#39;price:Q&#39;  ). transform_filter(label),    data=stocks). properties(  width=700,  height=400)    Data Tables&#182;: You can display tables per the usual way in your blog:       movies = &#39;https://vega. github. io/vega-datasets/data/movies. json&#39;df = pd. read_json(movies)# display table with pandasdf[[&#39;Title&#39;, &#39;Worldwide_Gross&#39;,   &#39;Production_Budget&#39;, &#39;IMDB_Rating&#39;]]. head()           Title   Worldwide_Gross   Production_Budget   IMDB_Rating         0   The Land Girls   146083. 0   8000000. 0   6. 1       1   First Love, Last Rites   10876. 0   300000. 0   6. 9       2   I Married a Strange Person   203134. 0   250000. 0   6. 8       3   Let's Talk About Sex   373615. 0   300000. 0   NaN       4   Slam   1087521. 0   1000000. 0   3. 4     Images&#182;: Local Images&#182;: You can reference local images and they will be copied and rendered on your blog automatically.  You can include these with the following markdown syntax: ![](my_icons/fastai_logo. png) Remote Images&#182;: Remote images can be included with the following markdown syntax: ![](https://image. flaticon. com/icons/svg/36/36686. svg) Animated Gifs&#182;: Animated Gifs work, too! ![](https://upload. wikimedia. org/wikipedia/commons/7/71/ChessPawnSpecialMoves. gif) Captions&#182;: You can include captions with markdown images like this: ![](https://www. fast. ai/images/fastai_paper/show_batch. png  Credit: https://www. fast. ai/2020/02/13/fastai-A-Layered-API-for-Deep-Learning/ ) Other Elements&#182;Tweetcards&#182;: Typing &gt; twitter: https://twitter. com/jakevdp/status/1204765621767901185?s=20 will render this:Altair 4. 0 is released! https://t. co/PCyrIOTcvvTry it with: pip install -U altairThe full list of changes is at https://t. co/roXmzcsT58 . . . read on for some highlights. pic. twitter. com/vWJ0ZveKbZ &mdash; Jake VanderPlas (@jakevdp) December 11, 2019 Youtube Videos&#182;: Typing &gt; youtube: https://youtu. be/XfoYk_Z5AkI will render this: Boxes / Callouts&#182;: Typing &gt; Warning: There will be no second warning! will render this:    Warning: There will be no second warning! Typing &gt; Important: Pay attention! It's important. will render this:    Important: Pay attention! It&#8217;s important. Typing &gt; Tip: This is my tip. will render this:    Tip: This is my tip. Typing &gt; Note: Take note of this. will render this:    Note: Take note of this. Typing &gt; Note: A doc link to [an example website: fast. ai](https://www. fast. ai/) should also work fine. will render in the docs:    Note: A doc link to an example website: fast. ai should also work fine. Footnotes&#182;: You can have footnotes in notebooks just like you can with markdown. For example, here is a footnote 1. This is the footnote. &#8617; "
    }, {
    "id": 7,
    "url": "https://shonaka.github.io/markdown/2020/01/14/test-markdown-post.html",
    "title": "Example Markdown Post",
    "body": "2020/01/14 - Basic setup: Jekyll requires blog post files to be named according to the following format: YEAR-MONTH-DAY-filename. md Where YEAR is a four-digit number, MONTH and DAY are both two-digit numbers, and filename is whatever file name you choose, to remind yourself what this post is about. . md is the file extension for markdown files. The first line of the file should start with a single hash character, then a space, then your title. This is how you create a “level 1 heading” in markdown. Then you can create level 2, 3, etc headings as you wish but repeating the hash character, such as you see in the line ## File names above. Basic formatting: You can use italics, bold, code font text, and create links. Here’s a footnote 1. Here’s a horizontal rule: Lists: Here’s a list:  item 1 item 2And a numbered list:  item 1 item 2Boxes and stuff:  This is a quotation    You can include alert boxes…and…    You can include info boxesImages: Code: General preformatted text: # Do a thingdo_thing()Python code and output: # Prints '2'print(1+1)2Tables:       Column 1   Column 2         A thing   Another thing   Tweetcards: Altair 4. 0 is released! https://t. co/PCyrIOTcvvTry it with: pip install -U altairThe full list of changes is at https://t. co/roXmzcsT58 . . . read on for some highlights. pic. twitter. com/vWJ0ZveKbZ &mdash; Jake VanderPlas (@jakevdp) December 11, 2019Footnotes:       This is the footnote.  &#8617;    "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')
    this.metadataWhitelist = ['position']

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}
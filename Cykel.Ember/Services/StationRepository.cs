using Cykel.Ember.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace Cykel.Ember.Services
{
    public class StationRepository: IStationRepository
    {
        private static IEnumerable<StationModel> _cache = null;
        private static DateTime _lastUpdate = DateTime.MinValue;

        public IEnumerable<StationModel> GetAll()
        {
            return Load();
        }

        public StationModel Get(string id)
        {
            return Load().SingleOrDefault(s => s.id == id);
        }

        private IEnumerable<StationModel> Load()
        {
            if (_cache != null && (DateTime.Now - _lastUpdate) < TimeSpan.FromMinutes(5))
                return _cache;

            var requestUri = new Uri("http://api.citybik.es/goteborg.json");
            var request = (HttpWebRequest)WebRequest.Create(requestUri);
            request.Method = WebRequestMethods.Http.Get;
            request.Accept = "application/json";

            var response = request.GetResponse();

            using (var stream = new StreamReader(response.GetResponseStream()))
            {
                string json = stream.ReadToEnd();
                var deserialized = Newtonsoft.Json.JsonConvert.DeserializeObject<CitybikesApiModel>(json);

                foreach (var model in deserialized)
                {
                    // convert coords to correct format (xx.xxxxxx)
                    model.lat /= 1000000;
                    model.lng /= 1000000;
                    model.name = NormalizeName(model.name);
                }

                _cache = deserialized;
                _lastUpdate = DateTime.Now;
            }

            return _cache;
        }

        private string NormalizeName(string name)
        {
            var parts = name.Split(new char[] { '/' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.Substring(0, 1).ToUpper() + s.Substring(1).ToLower());

            return string.Join(" / ", parts);
        }
    }
}